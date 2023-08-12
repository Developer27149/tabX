/**
 * Runs a given function that returns a Promise, and waits for a specified delay before resolving the Promise.
 * @template T
 * @param {() => Promise<T>} callback - The function to run.
 * @param {number} [delay=1000] - The amount of time to wait before resolving the Promise, in milliseconds.
 * @return {Promise<T>} - A Promise that resolves to the result of the given function.
 */
export const delayAsyncCallback = async <T>(
  callback: () => Promise<T>,
  delay = 1000
) => {
  const promise = new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, delay)
  })
  const [result] = await Promise.all([callback(), promise])
  return result
}

export const errorMessage = (msg: string) => {
  window._toast.error(msg)
}

export const successMessage = (msg: string) => {
  window._toast.success(msg)
}

// get favicon from domain
export const getFavicon = (u: string, size = 32 as string | number) => {
  const url = new URL(chrome.runtime.getURL("/_favicon/"))
  url.searchParams.set("pageUrl", u)
  url.searchParams.set("size", size.toString())
  return url.toString()
}
