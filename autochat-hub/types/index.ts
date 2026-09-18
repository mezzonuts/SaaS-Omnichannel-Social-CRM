
export interface Contact {
  id: string;
  wa_id: string;
  name: string;
  pipeline_stage: 'lead_masuk' | 'follow_up' | 'invoiced' | 'won' | 'lost';
}
export interface Message {
  id: string;
  contact_id: string;
  sender_type: 'customer' | 'agent' | 'bot';
  content: string;
  created_at: string;
}
