import { stringify } from "querystring";
import ShotGridAuthenticator from "./oauth";

export type SGUser = {
    id: string;
    name: string;
    type: string;
}

interface TaskAttributes {
    sg_overdue_or_onschedule: 'On Schedule' | 'Overdue';
    sg_reviewer_notes?: string;
    sg_late_task: boolean;
    sg_priority_1: string;
    sg_status_list: string;
    sg_project?: string;
    content: string;
    workload_per_day_per_assignee: number;
    workload_assignee_count: number;
    workload_per_day: number;
    workload: number;
    pinned: boolean;
    time_logs_sum: number;
    est_in_mins?: number;
    due_date: Date;
    inventory_date?: Date;
    duration: number;
    milestone: boolean;
    implicit: boolean;
    dependency_violation: boolean;
    time_percent_of_est?: number;
    time_vs_est?: number;
    color: string;
    // split_durations: null;
    // splits: null;
    start_date: Date;
    cached_display_name: string;
    sg_description?: string;
    // sg_sort_order: null;
    // filmstrip_image: null;
    created_at: Date;
    updated_at: Date;
    open_notes_count: number;
    image?: string;
    image_blur_hash?: string;
};

// TODO: flesh this out
export interface SGEntity {
    id: string;
    type: string;
    attributes: TaskAttributes;
    // relationships: {
    //     users: SGUser[];
    //     created_by: SGUser;
    // };
    links: {
        self: string;
    };
}

export default class ShotGridDAO {
    
    private static API = '/api/v1'

    private auth: ShotGridAuthenticator;
    private baseUrl: string;

    constructor(baseUrl: string, auth: ShotGridAuthenticator) {
        this.auth = auth;
        this.baseUrl = baseUrl;
    }

    async getEntity(type: string, id: number): Promise<SGEntity> {
        const token = await this.auth.getToken();
        return fetch(`${this.baseUrl}${ShotGridDAO.API}/entity/${type}/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token.access_token}`
            },
        })
        .then(res => res.json())
        .then(json => json.data);
    }
}