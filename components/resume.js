import JobDescription from './resume/job-description';
import List from './resume/list';
import ResumeBody from './resume/resume-body';
import ResumeFooter from './resume/resume-footer';
import ResumeHeader from './resume/resume-header';
import Section from './resume/section';
import Subheading from './resume/section-subheading';
import themes from '../themes';
import styled, { css } from 'react-emotion';

const leftBufferStyle = css`
  margin-left: 1rem;
`;

const ResumeContainer = styled.div`
  color: ${themes.resume.colors.text};
  margin: auto;
  width: 50rem;
  max-width: 90%;

  @media print {
    font-size: 12px;
    width: 100%;
    max-width: 100%;
  }
`;

const profileSection = (
  <Section title="Profile">
    <p>
      I am a front-end software developer specializing in web applications. I am
      seeking a position where I can leverage my expertise architecting and
      building JavaScript applications.
    </p>
    <p>
      I am most comfortable working in agile environments with strong ethics
      around mentorship, cooperative consensus-building, code quality, and unit
      testing.
    </p>
    <p>
      The technologies I am currently most interested in are React and Webpack.
    </p>
  </Section>
);

const educationSection = (
  <Section title="Education">
    <Subheading>Butler University, class of 2011</Subheading>
    <List>
      <li>
        BA in English (writing concentration) with a minor in Digital Media
        Production
      </li>
      <li>
        3.9 GPA, graduated <em>cum laude</em>
      </li>
      <li>
        Member of the Phi Beta Kappa society and the Mortar Board National Honor
        Society
      </li>
      <li>
        Recipient of the Jessie H. Cochran Memorial Award for excellence in
        writing
      </li>
    </List>
  </Section>
);

const skillsSection = (
  <Section title="Skills">
    <Subheading>Code</Subheading>
    <List>
      <li>Expert CSS (including Sass and LESS)</li>
      <li>
        Expert JavaScript (including Angular, Gulp, Grunt, Node.js, React, RxJS,
        TypeScript, and Webpack)
      </li>
      <li>Advanced C#/.NET</li>
      <li>Experience with Facebook, Flickr, Google and Instagram APIs</li>
    </List>

    <Subheading>Software</Subheading>
    <p className={leftBufferStyle}>
      Visual Studio 2015/2017, Adobe Creative Suite, Salesforce.com,
      ExactTarget, and Microsoft Office Suite
    </p>
  </Section>
);

const experienceSection = (
  <Section title="Experience">
    <Subheading>CoStar Group, Inc. (Apartments.com)</Subheading>
    <JobDescription>Software Developer | Jan 2015–Sept 2017</JobDescription>
    <List>
      <li>
        Played key role in advocating for the improvement of our front-end
        architecture, resulting in introducing Webpack, TypeScript, and Angular
        2 to our ecosystem in early 2017
      </li>
      <li>
        Implemented complete redesign of search map info cards, including
        transitioning legacy monolithic knockout.js view models to knockout.js
        components to improve maintainability
      </li>
      <li>
        Implemented listing profile page header redesign, which was the first
        major use of CSS flexbox layout on the site
      </li>
      <li>
        Pulled Apartments.com email rendering out of a 3rd party system and into
        our internal email processing system using RazorEngine, allowing us to
        rendering much more sophisticated emails while improving template code
        reuse
      </li>
      <li>Maintained site-wide Google Analytics integration</li>
    </List>

    <Subheading>Adgistics, Inc.</Subheading>
    <JobDescription>Front-End Developer | Aug 2013–Jan 2015</JobDescription>
    <List>
      <li>
        Worked on multiple enterprise client sites, maintaining each brand’s
        integrity alongside functional user interface
      </li>
      <li>Integrated .NET back end with HTML templates</li>
      <li>
        Managed CSS, involving drafting the company’s first set of CSS style
        guidelines
      </li>
      <li>
        Led front-end development of project management module built with
        Angular
      </li>
    </List>

    <Subheading>Brown-Forman Corporation</Subheading>
    <JobDescription>
      Software Architecture Associate | May 2012–July 2013
    </JobDescription>
    <List>
      <li>
        Took lead in developing UI for two internal iPad apps deployed via
        MobileIron
      </li>
      <li>
        Developed two applications on the Salesforce.com platform, the first
        tracking U.S. coupons and rebates, the other managing the approval
        workflow for all new packaging assets
      </li>
      <li>
        Played key role in rolling out and maintaining a new global content
        management system
      </li>
    </List>
  </Section>
);

export default function Resume() {
  return (
    <ResumeContainer>
      <ResumeHeader />

      <ResumeBody>
        <div>{experienceSection}</div>
        <div>
          {profileSection}
          {skillsSection}
          {educationSection}
        </div>
      </ResumeBody>

      <ResumeFooter />
    </ResumeContainer>
  );
}
