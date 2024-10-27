import BaseModel from './baseModel.ts';

export default interface Team extends BaseModel {
    name: string;
    roundPoints: number;
    accepted: boolean;
    image?: string | undefined;
}
