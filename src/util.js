export function binarySearch(arr, findVal, left = 0, right = arr.length - 1, repeatToRight = true, valueHook) {
  if (left > arr.length - 1) return { exist: false, index: Infinity };
  if (right < 0) return { exist: false, index: -Infinity };
  if (left > right) return { exist: false, index: right };

  const middle = Math.floor(left + ((right - left) / 2));
  if ((valueHook ? valueHook(arr[middle]) : arr[middle]) < findVal) {
    return binarySearch(arr, findVal, middle + 1, right, repeatToRight, valueHook);
  } else if ((valueHook ? valueHook(arr[middle]) : arr[middle]) > findVal) {
    return binarySearch(arr, findVal, left, middle - 1, repeatToRight, valueHook);
  }

  // repeat
  if (repeatToRight && ((valueHook ? valueHook(arr[middle + 1]) : arr[middle + 1]) === findVal)) {
    return binarySearch(arr, findVal, middle + 1, right, repeatToRight, valueHook);
  } else if (!repeatToRight && ((valueHook ? valueHook(arr[middle - 1]) : arr[middle - 1]) === findVal)) {
    return binarySearch(arr, findVal, left, middle - 1, repeatToRight, valueHook);
  } else {
    return { exist: true, index: middle };
  }
};
