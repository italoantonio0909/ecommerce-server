import { Campaign } from './Campaign';

export interface CampaignRepository {

    campaignAll(limit: number): Promise<Array<Campaign>>;

    campaignCreate(campaign: Campaign): Promise<Campaign>;
}