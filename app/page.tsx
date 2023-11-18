import Image from 'next/image'
import People from "./People";
import API_URL from './config';

type People = {
  name: string;
  gender: string;
  age: number;
  pets: { name: string; type: string }[];
}

async function getPeople(): Promise<People | null> {
  const res = await fetch(API_URL, {
    next: {
      revalidate: 0 // use 0 to opt out of using cache
    }
  })

  return res.json()
}
export default async function Home() {
  const people = await getPeople();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
        <div className="grid grid-cols-2 gap-4">
          <div className="border p-4">
            <h2 className="text-lg font-bold mb-2">Males with Cats</h2>
            <People people={people} filterByGender="Male" filterByPetType="Cat" />
          </div>
          <div className="border p-4">
            <h2 className="text-lg font-bold mb-2">Males with Dogs</h2>
            <People people={people} filterByGender="Male" filterByPetType="Dog" />
          </div>
          <div className="border p-4">
            <h2 className="text-lg font-bold mb-2">Females with Cats</h2>
            <People people={people} filterByGender="Female" filterByPetType="Cat" />
          </div>
          <div className="border p-4">
            <h2 className="text-lg font-bold mb-2">Females with Dogs</h2>
            <People people={people} filterByGender="Female" filterByPetType="Dog" />
          </div>
        </div>
      </div>
    </main>
  )
}
