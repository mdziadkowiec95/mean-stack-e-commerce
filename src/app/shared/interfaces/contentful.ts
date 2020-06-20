export interface EntriesResponse<I> {
    includes: any;
    items: I[];
    limit: number;
    skip: 0;
    sys: { type: string; };
    total: number;
}

export interface EntrySys {
    id: string;
    linkType: string;
    type: string;
}

export interface Entry<I> {
    fields: I;
    sys: {
        contentType: {
            sys: EntrySys;
        };
        createdAt: string;
        environement: {
            sys: EntrySys;
        };
        id: string;
        locale: string;
        revision: number;
        space: EntrySys;
        type: string;
        updatedAt: string;
    };
};

export interface ImageField {
    title: string;
    description: string;
    file: {
        contentType: string;
        details: {
            image: {
                height: number;
                width: number;
            };
            size: number;
        };
        fileName: string;
        url: string;
    };
}

export interface Category {
    categoryDescription: string;
    fieldName: string;
    icon: Entry<ImageField>;
}