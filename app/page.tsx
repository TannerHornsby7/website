export default function Home() {
  return (
    <>
        <h1 className="text-4xl font-bold text-gray-900">Tanner Hornsby</h1>
        <p className="text-2xl text-gray-900">Chicago and Dallas</p>
        <p className="mt-4 text-base">[Your mission statement here]</p>

        <section className="mt-8">
          <h2 className="text-base font-semibold">Currently</h2>
          <ul className="list-disc list-inside">
            <li>I am finishing my computer science degree at the University of Chicago</li>
            <li>I am building Ouradio</li>
            <li>I make music</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-base font-semibold">Previously</h2>
          <p>My time at Edovo, Data for Common Good, Hohonu, and UChicago</p>
        </section>

        <section className="mt-8">
          <h2 className="text-base font-semibold">Broadly</h2>
          <p>I am interested in music, optimization, ML, ...</p>
        </section>

        <section className="mt-8">
          <h2 className="text-base font-semibold">Contact</h2>
          <p>You can email me at tannerhornsby386@gmail.com. I am on Github and Twitter.</p>
        </section>

        <section className="mt-8">
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
        </section>
    </>
  );
}
