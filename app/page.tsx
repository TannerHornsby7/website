export default function Home() {
  return (
    <>
        <h1 className="text-4xl font-bold text-gray-900">Tanner Hornsby</h1>
        <p className="text-2xl text-gray-900">Chicago & Dallas</p>
        <p className="mt-4 text-base">The world is probably better with you in it</p>

        <section className="mt-8">
          <h2 className="text-base font-semibold">Currently</h2>
          <ul className="list-disc list-inside">
            <li>Finishing my computer science degree at the University of Chicago</li>
            <li>Building a music sharing platform</li>
            {/* called <a href="https://ouradio.net">ouradio</a> */}
            <li>Making music</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-base font-semibold">Previously</h2>
          <p>Empowered over 1 million users to learn with Edovo. Extended patient trial matching capabilites at Data for the Common Good. Extracted business insights on water level prediction at Hohonu.</p>
        </section>

        <section className="mt-8">
          <h2 className="text-base font-semibold">Broadly</h2>
          <p>I am interested in optimziation, cloud development, music, and more.</p>
        </section>

        <section className="mt-8">
          <h2 className="text-base font-semibold">Contact</h2>
          <p>You can email me at <a href="mailto:tannerhornsby386@gmail.com">tannerhornsby386@gmail.com</a>. I am also on <a href="https://github.com/tannerhornsby7">Github</a> and <a href="https://x.com/thornsbees">Twitter</a>.</p>
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
