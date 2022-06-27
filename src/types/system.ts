export interface ColorObItemType {
    [x: string]: string
}

export interface ColorElementType {
    name: string,
    key: string,
    show: string,
    icon: string,
    textColor: string,
    colors: ColorObItemType
}

export enum AsliderBarStatus {
    // eslint-disable-next-line no-unused-vars
    OPEN = 'open',
    // eslint-disable-next-line no-unused-vars
    CLOSE = 'close'
}
