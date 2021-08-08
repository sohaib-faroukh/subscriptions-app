import { Subscription } from 'models/subscription';
import { getRepository } from 'typeorm';
import { SubscriptionEntity } from '../entities/subscription.entity';

// request data
export const subscriptionRepo = getRepository<Subscription>( SubscriptionEntity );

