export class Config {
    public static GetURL(apiURL: string): string {
        //  const baseURL = 'http://ak-wks-1468:8081';
          const baseURL = 'https://espld202:44310';
        return baseURL + apiURL;
    }
}