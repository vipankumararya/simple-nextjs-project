import React from 'react';

export default function People({ people, filterByGender, filterByPetType }) {
  // Filter people based on the specified gender
  let filteredPeople = filterByGender
    ? people.filter((person) => person.gender === filterByGender)
    : people;

  // Further filter based on pet type if filterByPetType is provided
  filteredPeople = filterByPetType
    ? filteredPeople.filter((person) =>
      person.pets && person.pets.some((pet) => pet.type === filterByPetType)
    )
    : filteredPeople;

  return (
    <>
      <div className="overflow-x-auto">
        {filteredPeople && filteredPeople.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-green-500 uppercase tracking-wider">S. No.</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-green-500 uppercase tracking-wider">Owner&apos;s Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-green-500 uppercase tracking-wider">Gender</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-green-500 uppercase tracking-wider">{filterByPetType} Name</th>
              </tr>
            </thead>
            <tbody className="bg-none divide-y divide-gray-200">
              {filteredPeople.map((person, index) => (
                <tr key={index} className='align-text-top'>
                  <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{person.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{person.gender}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {person.pets &&
                      person.pets
                        .filter((pet) => !filterByPetType || pet.type === filterByPetType)
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((pet, petIndex) => (
                          <div key={petIndex}>
                            {pet.name}
                          </div>
                        ))}
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No data available</p>
        )}
      </div>
    </>
  );
}
