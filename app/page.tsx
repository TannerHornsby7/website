"use client";

/*
TODO:
- blog css overrides core site css which we should fix
- add header as a component in the blog and hydrate it with said header with custom emitter plugin
- add theming to the site s.t. we match with blog theme
*/

export default function Home() {
  return (
    <>
      <h1 className="text-4xl font-bold text-gray-900">Tanner Hornsby</h1>
      <p className="text-2xl text-gray-900">Chicago & Dallas</p>
      {/* <p className="mt-4 text-base">The world is probably better with you in it</p> */}

      <section className="mt-8">
        <h2 className="text-base font-semibold">Currently</h2>
        <ul className="list-disc list-inside">
          <li>
            Finished my Computer Science degree at the University of Chicago!
          </li>
          <li>Building Recommendation systems</li>
          {/* called <a href="https://ouradio.net">ouradio</a> */}
          {/* <li></li> */}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-base font-semibold">Previously</h2>
        <p>
          Empowered over 1 million users to learn with{" "}
          <a href="https://edovo.org">Edovo</a>. Extended patient trial matching
          capabilites at{" "}
          <a href="https://commons.cri.uchicago.edu">
            Data for the Common Good
          </a>
          . Extracted business insights on water level prediction at{" "}
          <a href="https://www.hohonu.io">Hohonu</a>.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-base font-semibold">Broadly</h2>
        <p>
          I am interested in optimization, cloud development, music, and more.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-base font-semibold">Contact</h2>
        <p>
          You can email me at{" "}
          <a href="mailto:tannerhornsby386@gmail.com">
            tannerhornsby386@gmail.com
          </a>
          . I am also on <a href="https://github.com/tannerhornsby7">Github</a>.
          If you are coming from one of my open source projects, feel free to
          reach out any time!
        </p>
      </section>

      {/* <section className="mt-8">
          <h2 className="text-base font-semibold">Recent Writing</h2>
          <ul>
            <li>
              <h3 className="font-bold">Post Title 1</h3>
              <p>First few lines of the post...</p>
            </li>
            <li>
              <h3 className="font-bold">Post Title 2</h3>
              <p>First few lines of the post...</p>
            </li>
            <li>
              <h3 className="font-bold">Post Title 3</h3>
              <p>First few lines of the post...</p>
            </li>
          </ul>
        </section> */}
    </>
  );
}
