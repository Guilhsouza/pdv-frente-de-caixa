const s3 = require('../src/servicos/aws')

const uploadImagem = async (path, buffer, mimetype) => {
    const imagem = await s3.upload({
        Bucket: process.env.BACKBLAZE_BUCKET,
        Key: path,
        Body: buffer,
        ContentType: mimetype
    }).promise();

    return {
        imagem: imagem.Location
    }
}

const removeImagem = async (path) => {
    await s3.deleteObject({
        Bucket: process.env.BACKBLAZE_BUCKET,
        Key: path
    }).promise();
}


module.exports = {
    uploadImagem,
    removeImagem
}
