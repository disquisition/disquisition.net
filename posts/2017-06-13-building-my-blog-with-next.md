---
published: true
unsplash_photo_id: qmoMjl_kGvM
description: I decided to build a blog.
---

# Building My Blog With Next.js

I recently decided to build a blog. In 2017, it is easier than ever to get a blog online, but instead of using one of the many shake and bake solutions I chose to have a little fun and build out a React-based site.

[Next.js][next] is one of the best solutions available right now for React development. It is one of a handful of options for those who, like me, don't want to spend too much time fiddling with configuration and build process setup.

## Initial Setup

Start with this `package.json`:

```json
{
    "scripts": {
        "dev": "next",
        "build": "next build",
        "start": "next start"
    }
}
```

Save the following as `/pages/index.js`:

```js
export default () => (
    <div>
        <h1>Welcome to Next.js</h1>
        <p>See how easy that was?</p>
    </div>
);
```

Now run `npm i --save next react react-dom && npm run dev`. _That's it._

## Advanced Setup

Okay, I lied a little bit when I said "that's it." Next.js only has one major drawback: it doesn't play nice with dynamic URLs out of the box (i.e., `/blog/:slug`, where `:slug` is a dynamic URL segment corresponding to a specific blog post). Given that this is an extremely common use case, it feels like an oversight but luckily there is a fairly clean workaround: [`next-routes`][next-routes]. You can even find an example implementation in the Next.js GitHub repository [here][next-routes example].

The basic idea is that `next-routes` wraps the built-in Next.js router and `Link` component such that dynamic URL segments are treated as query parameters internally. In practice, this is reasonably intuitive... but I still wish I didn't need a third party package for this.

## Writing Posts

I could have called it a day after setting up routing. At that point, all you really need to do is save your blog posts as HTML in a separate directory and then when a reader hits `/blog/my-first-post` you just load the HTML for `my-first-post.html` and display it using the `dangerouslySetInnerHTML` API.

I wanted the simplicity of a file-based composition mechanism---after all, why else would I be using Next.js?---but HTML doesn't make for the best writing experience. The obvious choice was Markdown. I ended up deciding against simply compiling to HTML, but rather to using the excellent [`unified`][unified] package---combined with [`rehype-parse`][rehype-parse]---to compile to an AST. The AST is what gets sent to the client, where it is rendered as a tree of React components.

The reason for this approach is more than just avoiding the `dangerouslySetInnerHTML` API. Rendering the whole tree allows me to substitute my own components for, e.g., plain `<a></a>` tags. This allows me to write posts as Markdown while maintaining very fine-grained control over how those posts are loaded and displayed.

## What about Create React App?

I looked briefly at using [Create React App][cra] to build this site, but decided against it. CRA is a fantastic tool but on the the site&nbsp;&harr;&nbsp;app continuum, it leans much further toward "app" territory than Next.js. Here are some points to consider if you're deciding between Next.js and Create React App:

- __Routing__: Next.js has built-in, file-based routing, whereas Create React App has no routing built in but can easily be paired with `react-router`. This may seem like a small difference, but it's worth taking a look at the more advanced examples in the [`react-router` docs][react-router docs]---if you see something you think you need, you may be better off with CRA. If not, Next.js's simpler, built-in routing will be fine.
- __Hot Code Reloading__: Next.js hot reloads code changes automatically while running in dev mode. If you haven't experienced hot reloading before, do yourself a favor and create a simple Next.js app just to see it in action. It's incredible. Create React App currently does not offer a hot reloading solution.
- __Server Side Rendering__: Next.js is server side rendered (SSR) by default, while Create React App does not currently offer an SSR solution. If you're building an app, SSR may not be your top priority, but if you're building a blog or other site with strict SEO requirements, Next.js may be the safer bet.
- __`Head`__: Next.js has built-in ways of managing your `head`, via the custom `Head` component. Create React App has great recommendations about how to add comparable functionality, but nothing as easy and straightforward as Next.js.
- __Ejecting__: Create React App provides an eject script which will boot you from the curated CRA environment. This can be valuable if you want to use CRA as a way to kickstart development and then later realize you require complete control over your build process. With Next.js, you are more or less locked in.

For me, hot loading and SSR outweighed lock-in and wrangling its extremely simple routing. I considered doing a separate blog post devoted to comparing Next.js and Create React App, but honestly they are different enough that most of the time it should be very easy to choose one or the other.

## What's next?

Right now, when I need to publish a post I'm just redeploying the site with `now`. `now` makes this a very easy solution, however, I really shouldn't have to redeploy just to add a new post, right? (I know we live in a post-Jekyll world, but it still feels wrong.)

The solution I'm looking at now is creating a simple Dropbox webhook. This should allow me to save my posts in a folder on my personal Dropbox account and have them automatically picked up by the blog.

[cra]: https://github.com/facebookincubator/create-react-app "Create React App"
[next]: https://zeit.co/blog/next2 "Next.js 2.0"
[next-routes]: https://www.npmjs.com/package/next-routes "next-routes"
[next-routes example]: https://github.com/zeit/next.js/tree/v3-beta/examples/with-next-routes "next-routes example"
[react-router]: https://github.com/ReactTraining/react-router "React Router"
[react-router docs]: https://reacttraining.com/react-router/web/guides/quick-start "React Router Documentation"
[rehype-parse]: https://github.com/wooorm/rehype/tree/master/packages/rehype-parse "Rehype: HTML processor powered by plugins"
[unified]: https://github.com/unifiedjs/unified "Unified: Text processing umbrella: Parse / Transform / Compile"