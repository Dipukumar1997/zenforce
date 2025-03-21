#include <stdio.h>
#include <string.h>

int main() {
    // if str is "abc", strlen(str) will return 3
    // char str[] = "Hello";  // The string "Hello" has 5 characters + 1 null character
    // printf("String: %s\n", str);
    // printf("Size of the string (including null character): %lu\n", sizeof(str));

    // // Printing the null character
    // printf("Null character as ASCII: %d\n", str[5]);
    // printf("Null character display: [%c]\n", str[5]);  // It won't display anything
// char str1[10] = 
    char str1[10];
    fgets(str1,10,stdin);
    puts(str1);
    return 0;
}
