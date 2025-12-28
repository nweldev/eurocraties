import { NextResponse } from 'next/server';
import prisma from '../_orm/prisma';
import { countryBaseProps, synthetiseCountrie, synthetisedCountrieSelector } from './_synth';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const isSynthetic = searchParams.get('synthetic') !== null;

  let data;
  try {
    if (isSynthetic) {
      const countries = await prisma.countrie.findMany({
        select: synthetisedCountrieSelector
      });

      data = countries.reduce((acc, countrie) => {

        return {
          ...acc,
          [countrie.code]: synthetiseCountrie(countrie)
        }
      }, {} as Record<string, any>);

      
    } else {
      data = await prisma.countrie.findMany({
        select: countryBaseProps,
      });
    }

    return NextResponse.json({ data });
  } catch (e) {
    let error = process.env.NODE_ENV === 'production' ? 'server error' : (e as Error).message || e;

    return NextResponse.json({ error }, { status: 500 });
  }
}
