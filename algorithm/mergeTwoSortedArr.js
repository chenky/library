/**
 * 
 * 不使用额外空间的情况下合并两个有序数组。最优算法合并两个有序数组
这个算法的基本思想是，从两个数组的末尾开始比较元素，
并将较大的元素放在合并后数组的末尾。然后依次向前移动指针，
重复这个过程直到其中一个数组的所有元素都被合并。
*/
function mergeSortedArrays (arr1, arr2) {
    let i = arr1.length - 1 // 指向arr1的末尾
    let j = arr2.length - 1 // 指向arr2的末尾
    let mergedIndex = arr1.length + arr2.length - 1 // 合并后数组的索引位置

    // 从后向前比较元素，将较大的元素放在合并后数组的末尾
    while (i >= 0 && j >= 0) {
        if (arr1[i] > arr2[j]) {
            arr1[mergedIndex] = arr1[i]
            i--
        } else {
            arr1[mergedIndex] = arr2[j]
            j--
        }
        mergedIndex--
    }

    // 如果是arr1有剩余元素，则剩余元素不用动，整个数组就是有序的

    // 将arr2中剩余的元素添加到arr1的前面
    while (j >= 0) {
        arr1[mergedIndex] = arr2[j]
        j--
        mergedIndex--
    }

    return arr1
}

// 示例用法
const arr1 = [1, 3, 5, 7]
const arr2 = [2, 4, 6, 8]
const mergedArray = mergeSortedArrays(arr1, arr2)
console.log(mergedArray)
