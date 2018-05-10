interface IConfig {
    getItem(key: string): any;
    setItem(key: string, value: any): void;
}

export default IConfig;