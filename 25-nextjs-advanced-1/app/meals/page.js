import Link from "next/link";
import { Suspense } from "react";

import classes from './page.module.css';
import MealsGrid from "@/components/meals/meal-grid";
import { getMeals } from "@/lib/meals";
import MealsLoadingPage from "./loading-out";

export const metadata = {
  title: 'All Meals',
  description: 'Browse the delicious meals shared by our vibrant community',
};

async function Meals() {
  const meals = await getMeals();

  return <MealsGrid meals={meals} />;
}

export default function MealsPage() {
  return(
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals, created <span className={classes.highlight}>by you</span>
        </h1>
        <p>
          Choose your favourite recipe and cook it yourself. It is easy and fun!
        </p>
        <p className={classes.cta}>
          <Link href="/meals/share">
            Share your Favourite Recipe
          </Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense fallback={<MealsLoadingPage />}>
          <Meals />
        </Suspense>
      </main>
    </>
  )
}