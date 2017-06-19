---
published: true
---

# Angular 2 Postmortem

I've spent a long time using, reading about, and thinking about React, so when the time came to decide the future of front-end development at [Apartments.com][apartments] I pushed hard in that direction. However, after a long series of discussions, we ended up settling on Angular 2 (hereafter referred to simply as "Angular").

I admit I was disappointed, but given that our existing front-end is built mostly with jQuery and knockout.js, and is definitely showing its age, almost anything else would be a big step forward. In any event, I have some distance from our first major project and below are some thoughts that stick out from the initial foray.

## Webpack

Like most current front-end build pipelines, Webpack played a central role in our bundling process. Most of our JavaScript code at Apartments.com is packaged in a custom [AMD][]-style JIT bundler, so moving to Webpack and ES2015-style `import` statements represented a significant shift in our development and deployment workflows.

We identified a number of potential hurdles early on but the only issue we ended up having was Webpack compilation time. Waiting for 20 to 30 seconds for Webpack to rebuild its bundles after a code change was a very negative experience. We worked to improve compilation time but 20 seconds remains the rough average. Based on personal experience, this seems long, so I hesitate to blame Webpack itself, but we have yet to identify the underlying issue.

Currently, we have our Webpacked apps running right alongside our legacy code, with no meaningful interop, but the solution we've discussed when we get to the point where Webpack/legacy interop is a necessity is to output our Webpack apps as UMD bundles and consume them at the entry point of the legacy app (using the `externals` Webpack configuration option to allow legacy modules to be used within the Webpacked code).

## TypeScript

The Angular docs say you don't _need_ TypeScript, but I don't think they're fooling anyone. Luckily, TypeScript is a massive breath of fresh air for anyone used to working with a strongly-typed language. Especially for large teams, strong types can be a huge maintenance boon.

That said, using TypeScript---currently[^babeltypescript]---precludes the use of the incredibly rich Babel ecosystem. At the very least, [`babel-preset-env`][babel-preset-env] is one the most intuitive ways to manage polyfills and code transforms and I don't see anything like that ending up in the TypeScript compiler anytime soon.

## RxJS

The role of RxJS is downplayed a bit in the Angular docs, which led us to put off team RxJS training until late in our development cycle. This was a mistake. Most of our devs were unfamiliar with Observables and the RxJS library of operators, and failing to formally introduce these concepts as a core part of the framework lead to some pain later in the sprint.

That said, RxJS Observables are incredibly useful. I was reluctant to embrace Observables at first simply because I was already very comfortable using Promises and a second asynchronous primitive seemed redundant. However, once I wrapped my mind around their use and got comfortable with a handful of operators, I found myself really enjoying the ergonomics.

## Dependency Injection

It's worth taking a moment to talk about Angular's dependency injection mechanism. Angular is the only major front-end framework I'm familiar with that uses constructor injection. The only real reason this is important is because constructor injection is very common outside of the JavaScript world. This makes Angular more approachable for those whom JavaScript is a second language.

The tradeoff, of course, is that everything needs to be registered in a DI container somewhere for any of it to work. Our teams worked extensively with [Unity][] DI in the .NET framework, so for us this is nothing new, but it feels unusual for a JavaScript framework.

Bottom line, Angular's DI is a small feature, but if your team is most familiar with constructor injection, it's one of those things that will make them feel immediately at home.

## `ngrx/store`

Being a React evangelist, it probably comes as no surprise that I found the popular `ngrx/store` library appealing. If you're unfamiliar, `ngrx/store` is a Redux-style state management solution with an optional plugin that uses RxJS Obervables (à la `redux-observable`) to handle asynchronous behavior. This was all music to my ears, but the Redux pattern is generally misunderstood, especially outside the React community, so it took some effort to onboard the team.

The discussions we had regarding `ngrx/store` generally centered on one of two main points of comparison: our older pub/sub eventing architecture on one hand, and managing state by using a number of generic Angular services. Most of the team was eager to move away from the pub/sub model since in our experience it scales poorly, and the more we discussed generic services the more it seemed like we would just be replicating the `ngrx/store` API.

I don't think everyone on the team was completely comfortable with the pattern, but we did get to a point where everyone agreed they could see the potential benefits.

## Rough Edges

Okay, let's be real for a second: Angular is incredibly overengineered. If you're reaching for Angular because you're desperately searching for something that isn't React, take a serious look at Ember or Vue.js. Then maybe take one more quick look at React.

Angular is a _heavy_ framework. Angular is a framework populated with numerous disparate architectural concepts---components, services, pipes, etc.---and most of these require their own specialized configuration. App configuration is most onerous early in the development cycle, but it never goes away entirely.[^modulecreationanecdote] Routing has its own special configuration. Testing requires a ton of special setup and configuration. The template syntax is terrible, and AOT is more trouble than it should be.

It's not like other frameworks don't have their rough edges and quirks, or that there are no reasons to choose Angular over the competition. Angular does DI really, really well. The async unit testing utilities are awesome. But coming from React, where adding a new component is as simple as typing `export default () => <p>Hello World!</p>;`[^reactexample] and hitting save, the day to day of working with Angular feels slow. Plus, the two best parts of our Angular experience---TypeScript and RxJS---can be used without Angular itself.

## Final Thoughts

Angular is a framework burdened by its past. For all the changes Angular 2 brought, it adheres to much of the design philosophy of Angular 1.6, even as much of the JavaScript community---including one of Angular's own contemporaries, Ember---has grown beyond that era. Angular will find a home in the C#/.NET community, but I don't think it will appeal to dedicated front-end engineers. There are just easier ways to get things done.

[^babeltypescript]: [Babel may soon get a TypeScript parser][babylon ts support].
[^context]: Looking at you, `context`.
[^modulecreationanecdote]: It became obvious very early in our first sprint working with Angular that needing to constantly maintain the top-level module configuration was untenable. We ended up writing a custom build step that involved detecting module files and then scanning `.ts` files in that directory and its subdirectories, building up a catalogue of references to providers and declarations, and finally generating the configuration that normally each dev would have to hand-write. This took about four days of dev between a coworker and myself. I was happy with the result, but needing to work this hard to smooth out a framework's rough edges is a huge red flag.
[^reactexample]: Okay, you probably also need `import React from 'react';`. That's not the point.

[amd]: https://github.com/amdjs/amdjs-api/wiki/AMD "Asynchronous Module Definition (AMD) API"
[apartments]: https://apartments.com "Apartments.com"
[babel-preset-env]: https://babeljs.io/docs/plugins/preset-env/ "babel-preset-env"
[babylon ts support]: https://github.com/babel/babylon/pull/523 "babel/babylon#523 WIP: TypeScript parser"
[unity]: https://msdn.microsoft.com/en-us/library/dn170416.aspx "Unity"
