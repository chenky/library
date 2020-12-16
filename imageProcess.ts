import { ElUploadInternalRawFile } from 'element-ui/types/upload'
import { compress, compressAccurately, ICompressConfig, compressAccuratelyConfig } from 'image-conversion'

export async function compressImgRaw (
  imgRaw: ElUploadInternalRawFile,
  config: ICompressConfig | compressAccuratelyConfig | number
) {
  const compressMethod = ((typeof config === 'number' && config > 1) ||
    (config as compressAccuratelyConfig).size ||
    (config as compressAccuratelyConfig).accuracy)
    ? compressAccurately : compress

  const compressedImgBlob = await compressMethod(imgRaw, config)
  const compressedFile = new File(
    [compressedImgBlob],
    imgRaw.name,
    { type: compressedImgBlob.type }
  ) as ElUploadInternalRawFile

  return compressedFile
}

/**
 * 获取图片文件的元素信息，比如宽、高等
 * -------------------- */
export function getImgElementInfoByFileRaw (imgFileRaw: ElUploadInternalRawFile): Promise<null | HTMLImageElement> {
  return new Promise((resolve) => {
    if (!imgFileRaw.type.startsWith('image')) {
      resolve(null)
      return
    }

    const url = URL.createObjectURL(imgFileRaw)
    const img = document.createElement('img')

    img.onload = () => {
      resolve(img)
      URL.revokeObjectURL(url)
    }
    img.onerror = () => resolve(null)

    img.src = url
  })
}
