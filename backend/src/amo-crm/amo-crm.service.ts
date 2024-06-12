import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { Contact, Lead, Result, Status, User } from 'src/types/types';

@Injectable()
export class AmoCrmService {
    private readonly AMOCRM_ACCESS_TOKEN: string;

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService
    ) {
        this.AMOCRM_ACCESS_TOKEN = this.configService.get<string>('AMOCRM_ACCESS_TOKEN');
        console.log(this.AMOCRM_ACCESS_TOKEN);
    }

    async getLeads(query?: string): Promise<Result[]> {
        const url = 'https://elaman1007.amocrm.ru/api/v4/leads';

        const headers = {
            Authorization: `Bearer ${this.AMOCRM_ACCESS_TOKEN}`,
        };

        const params = query ? { query, "with": "contacts" } : { "with": "contacts" };

        try {
            const response = await firstValueFrom(
                this.httpService.get(url, { headers, params })
            );

            const leads: Lead[] = response.data._embedded.leads;

            const results: Result[] = await Promise.all(leads.map(async (lead) => {
                const user = await this.getUser(lead.responsible_user_id);
                const contacts = await Promise.all(lead._embedded.contacts.map(async (contact) => {
                    const contactDetails = await this.getContact(contact.id);
                    return {
                        id: contactDetails.id,
                        name: contactDetails.name,
                        first_name: contactDetails.first_name,
                        last_name: contactDetails.last_name,
                        custom_fields_values: contactDetails.custom_fields_values
                    };
                }));
                const status = await this.getStatus(lead.pipeline_id, lead.status_id);

                return {
                    id: lead.id,
                    name: lead.name,
                    price: lead.price,
                    responsible_user: {
                        id: user.id,
                        name: user.name,
                        email: user.email
                    },
                    status_id: {
                        id: status.id,
                        name: status.name
                    },
                    created_at: new Date(lead.created_at * 1000),
                    contacts: contacts
                };
            }));

            return results;
        } catch (error) {
            throw error;
        }
    }

    async getUser(id: number): Promise<User> {
        const url = `https://elaman1007.amocrm.ru/api/v4/users/${id}`;

        const headers = {
            Authorization: `Bearer ${this.AMOCRM_ACCESS_TOKEN}`,
        };

        try {
            const response = await firstValueFrom(
                this.httpService.get(url, { headers })
            );

            const user: User = response.data;
            return user;
        } catch (error) {
            throw error;
        }
    }

    async getContact(id: number): Promise<Contact> {
        const url = `https://elaman1007.amocrm.ru/api/v4/contacts/${id}`;

        const headers = {
            Authorization: `Bearer ${this.AMOCRM_ACCESS_TOKEN}`,
        };

        try {
            const response = await firstValueFrom(
                this.httpService.get(url, { headers })
            );

            const contact: Contact = response.data;
            return contact;
        } catch (error) {
            throw error;
        }
    }

    async getStatus(pipeline_id: number, status_id: number): Promise<Status> {
        const url = `https://elaman1007.amocrm.ru/api/v4/leads/pipelines/${pipeline_id}/statuses/${status_id}`;

        const headers = {
            Authorization: `Bearer ${this.AMOCRM_ACCESS_TOKEN}`,
        };

        try {
            const response = await firstValueFrom(
                this.httpService.get(url, { headers })
            );

            const status: Status = response.data;
            return status;
        } catch (error) {
            throw error;
        }
    }
}
