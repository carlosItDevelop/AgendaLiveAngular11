import { SafeResourceUrl } from '@angular/platform-browser';
export interface Live{
  id: string;
  liveName: string;
  channelName: string;
  liveTime: string;
  liveDate: string;
  liveLink: string;
  urlSafe: SafeResourceUrl;
  statusLive: string;
}
