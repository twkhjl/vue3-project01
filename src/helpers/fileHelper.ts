export const useFileHelper = () => {
  function _readAsDataURL(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        resolve(reader.result)
      }
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }
  async function readEventDataTransferAsDataURL(event: any) {
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    if (file) {
      const base64Data = await _readAsDataURL(file)
      return base64Data
    }
  }
  async function readInputElementAsDataURL(el: any) {
    const file = el.files[0]

    if (file) {
      const base64Data = await _readAsDataURL(file)
      return base64Data
    }
  }
  async function readFileAsDataURL(file: any) {
    if (file) {
      const base64Data = await _readAsDataURL(file)
      return base64Data
    }
  }
  return {
    readEventDataTransferAsDataURL,
    readInputElementAsDataURL,
    readFileAsDataURL,
  }
}
