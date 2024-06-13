// Kalau DTO (Data Transfer Object) ga perlu semua di tuliskan semua, kalau entity baru tuliskan semua, karena DTO dan T-nya transfer, berarti digunakan untuk tranfer data seperti post, patch
// ini untuk upload
export type CreateThreadDTO = {
    content : string,
    image: FileList

}


