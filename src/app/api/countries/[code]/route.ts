import { NextResponse } from 'next/server';
import prisma from '../../_orm/prisma';
import { countryBaseProps, synthetiseCountrie, synthetisedCountrieSelector } from '../_synth';

export async function GET(request: Request, { params }: { params: { code: string } }) {
  const { searchParams } = new URL(request.url);

  const isSynthetic = searchParams.get('synthetic') !== null;

  let data;
  try {
    if (isSynthetic) {
      const countrie = await prisma.countrie.findUnique({
        where: {
          code: params.code,
        },
        select: synthetisedCountrieSelector,
      });

      data = synthetiseCountrie(countrie);
    } else {
      data = await prisma.countrie.findUnique({
        where: {
          code: params.code,
        },
        select: countryBaseProps,
      });
    }

    return NextResponse.json({ data });
  } catch (e) {
    let error = process.env.NODE_ENV === 'production' ? 'server error' : (e as Error).message || e;

    return NextResponse.json({ error }, { status: 500 });
  }
}
