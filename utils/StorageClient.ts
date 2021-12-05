import { Web3Storage } from 'web3.storage'
import { v4 as uuidv4 } from 'uuid';

class StorageClient {
    client: Web3Storage;
    constructor() {
        this.client = new Web3Storage({
            token: process.env.NEXT_PUBLIC_WEB3_STORAGE_API_KEY!,
        })
    }
    public async storeFiles(file: any) {
        const ext = file.name.split('.').pop();
        const fileName = `${uuidv4()}.${ext}`;
        const newFile = new File([file], fileName, {type: file.type});
        const cid = await this.client.put([newFile], {
            name: fileName,
        });
        const imageURI = `https://${cid}.ipfs.dweb.link/${fileName}`;
        return imageURI;
    }
}

export default StorageClient