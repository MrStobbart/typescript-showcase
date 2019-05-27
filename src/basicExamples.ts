import { ObjWithId, Addable } from './addable';

interface Person extends ObjWithId {
  age: number;
}

interface Hobby {
  name: string;
  isPhysicalActivity: boolean;
}

interface Club {
  name: string;
  offeredHobbies: Hobby[];
  members: Addable<Person>;
}

const parcour: Hobby = {
  name: 'Parcour',
  isPhysicalActivity: true,
};

const archery: Hobby = {
  name: 'Archery',
  isPhysicalActivity: true,
};

const dnd: Hobby = {
  name: 'Dungeons and Dragons',
  isPhysicalActivity: false,
};

function sideEffect() {
  console.log('List changed');
}

class ClubMembers extends Addable<Person> {
  constructor(...items: Person[]) {
    super(sideEffect, ...items);
  }
}

const clubs = {
  sc: {
    name: 'SC Dies und Das',
    offeredHobbies: [parcour],
    members: new ClubMembers(),
  },
  napier: {
    name: 'Napier student club',
    offeredHobbies: [dnd, archery],
    members: new ClubMembers(),
  },
};

export function someExampleFunction() {
  clubs.napier.members.push({ id: 'Courtenay', age: 24 });
  clubs.napier.members.push({ id: 'Marek', age: 24 });
  clubs.napier.members.push({ id: 'Jack', age: 23 });

  clubs.sc.members.push({ id: 'Richard', age: 21 });
  clubs.sc.members.push({ id: 'Karl', age: 29 });

  console.log(JSON.stringify(clubs, null, 2));

  clubs.napier.members.remove('Marek');
  clubs.sc.members.remove('Karl');
  console.log(JSON.stringify(clubs, null, 2));
}
