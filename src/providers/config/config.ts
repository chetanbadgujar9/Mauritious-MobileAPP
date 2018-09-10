export class Config {
    public static GetURL(apiURL: string): string {
        //  const baseURL = 'http://ak-wks-1468:8081';
        const baseURL = 'https://espld202:44310';
        return baseURL + apiURL;
    }
    public static GetMemberURL(apiURL: string): string {
        //  const baseURL = 'http://ak-wks-1468:8081';
        const memberURL = 'https://espld202:5006';
        return memberURL + apiURL;
    }
    public static GetEventAndNewsURL(apiURL: string): string {
        //  const baseURL = 'http://ak-wks-1468:8081';
        const eventAndNewsURL = 'https://espld202:6006';
        return eventAndNewsURL + apiURL;
    }
}