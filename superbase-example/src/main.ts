import "./style.css";
import {Database} from "/schema";
import { createClient } from "@supabase/supabase-js";


const supabaseUrl = "https://zstywelqfgshdnkypvwi.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpzdHl3ZWxxZmdzaGRua3lwdndpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODcxODYxMzYsImV4cCI6MjAwMjc2MjEzNn0.6Yt8jkgmCWBKH4Od0yeq3_kRQIRZerf2Lj0LAYV8c7U";
const supabase = createClient(supabaseUrl, supabaseKey);

async function getData() {
  const { data, error } = await supabase.from("countries").select();

  console.log(error);
  const listCountry = document.getElementById("listCountry");
  if (data != null) {
    for (let index = 0; index < data.length; index++) {
      console.log(data[index]);
      const li = document.createElement("li");
      const deleteIcon = document.createElement("i");
      deleteIcon.innerHTML = `<i class="fa-regular fa-trash-can"></i>`;
      deleteIcon.id = data[index].id;
      li.textContent = data[index].name;
      li.id = data[index].id;
      listCountry?.appendChild(li);
      listCountry?.appendChild(deleteIcon);
    }
  }
}

getData();

const submitBtn = document.getElementById("submit");

submitBtn?.addEventListener("click", async () => {
  const countryName = document.getElementById(
    "countryName"
  ) as HTMLInputElement | null;
  const { error } = await supabase
    .from("countries")
    .insert({ name: countryName?.value });
});

// const listCountry = document.getElementById("listCountry") as HTMLInputElement;

// listCountry?.addEventListener("click", async () => {
//   const { error } = await supabase

//     .from("countries")
//     .delete()
//     .eq("id", listCountry?.value);
// });

// ----- interface work only in typescript ----- \\
interface userInterface {
  name: string;
  age: number;
  id: string | number;
}

class HumanClass {
  name: string | undefined;
  age: number | undefined;
  id: string | number | undefined;
}

const HumanClassVaribale = new HumanClass();
HumanClassVaribale.age = 31;
console.log(HumanClassVaribale);

const obj: userInterface = {
  name: "yoskad",
  age: 30,
  id: 55,
};

function addAge(human: userInterface) {
  human.age = human.age + 1;
}

console.log(obj);

class Dog {
  color: string;
  age: number;
  size: number | string;
  weight: number | string;

  constructor(c: string, a: number, s: number | string, w: number | string) {
    this.color = c;
    this.age = a;
    this.size = s;
    this.weight = w;
  }
}

const pako = new Dog("pako", 5, "L", 34);
const ben = new Dog("ben", 8, "S", 59);

console.log(pako, ben);

function sum(a: number, b: number) {
  return a + b;
}

console.log(sum(5, 7));

type Gender = "female" | "male";
type Color = "black" | "grey" | "white";

class Animal {
  age: number;
  color: string;

  constructor(age: number, color: string) {
    this.age = age;
    this.color = color;
  }

  showColor() {
    console.log(`My color is ${this.color}`);
  }
  getOlder() {
    console.log(`My age is ${this.age}`);
    this.age++;
  }
}

class Mammel extends Animal {
  amountOfMilk: number;

  constructor(milk: number, color: string, age: number) {
    super(age, color);
    this.amountOfMilk = milk;
  }
  getMoreMilk() {
    console.log(`My amount of milk is ${this.amountOfMilk} liters`);
  }
}

// const animal1 = new Animal(4 ,'black');
// console.log(animal1.displayInfo());


function returnMe <T>(arg: T):T {
  return arg;
}

const n = returnMe<number>(30)
console.log(n);


function returnMe3<T extends string | string [] | number>(arg: T): T {
  return arg;
}

const arrSrting3 = returnMe3<string[]>(['s' , 'w'])

console.log(arrSrting3);

//type gender = 'Male' | 'Famle';


// method 1 --------// 
interface BoxInter {
    value: string;
}

function getBox<T extends BoxInter> (value:T) :T {
  return value;
}

const print = getBox<BoxInter>({value: 'print'});

console.log(print);


// method 2 ------///
interface BoxInter1 <T> {
  name: string;
}

function getName <T extends BoxInter1<string>> (name:T) :T {
  return name;
}

const printName = getName<BoxInter1<string>>({name: 'yoskad'});

console.log(printName);



// method 3 ------///
interface BoxInter2 <T> {
  name: T;
}

function boxUser<T>(box: BoxInter2<T>) :T {
  return box.name;
}