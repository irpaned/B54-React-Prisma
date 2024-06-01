export type CreateThreadDTO = {
    content : string,
    avatar : string,
    image : string,
    numberOfReplies : number, 
    numberOfLike : number,
    numberOfShare : number

};

export type UpdateThreadDTO = CreateThreadDTO