async function getPeople() {
  const res = await fetch('https://gist.githubusercontent.com/medibank-digital/a1fc81a93200a7b9d5f8b7eae0fac6f8/raw/de10a4fcf717e6c431e88c965072c784808fd6b2/people.json', {
    next: {
      revalidate: 0 // use 0 to opt out of using cache
    }
  })

  return res.json()
}

export default async function PeopleList() {
  const people = await getPeople()

  return (
    <>
      <div>
      {people.map((person) => (
        <div>
          {person.name}
        </div>
      ))}
      {people.length === 0 && (
        <p className="text-center">There are no persons</p>
      )}
      </div>
    </>
  )
}