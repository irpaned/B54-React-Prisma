export type CreateThreadDTO = {
    content : string,
    image : string,
    avatar : string,
    numberOfReplies : number, 
    numberOfLike : number,
    numberOfShare : number

};

export type UpdateThreadDTO = CreateThreadDTO