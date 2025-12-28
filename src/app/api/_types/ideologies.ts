import { EconomicIdeology, IdeologicFamily, Prisma, SocialIdeology } from '@prisma/client';

export const leftFamilies: IdeologicFamily[] = [IdeologicFamily.CONVENTIONAL_LEFT, IdeologicFamily.RADICAL_LEFT, IdeologicFamily.FAR_LEFT];
export const rightFamilies: IdeologicFamily[] = [IdeologicFamily.CONVENTIONAL_RIGHT, IdeologicFamily.RADICAL_RIGHT];
export const centerFamilies: IdeologicFamily[] = [IdeologicFamily.CENTRE, IdeologicFamily.CATCH_ALL];

export const liberals: EconomicIdeology[] = [EconomicIdeology.NEOLIB, EconomicIdeology.SOCIAL_MARKET, EconomicIdeology.LIBERAL];

export const conservatives: SocialIdeology[] = [SocialIdeology.CONSERVATIVE, SocialIdeology.REACTIONARY, SocialIdeology.DECLINIST];

export type IdeologicGroup = 'farLeft' | 'left' | 'thirdWay' | 'centre' | 'right' | 'farRight' | 'unclassified';

export interface FamilyData {
  score: Prisma.Decimal;
  seats: number;
  share: number;
}