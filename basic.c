#include <stdio.h>

int main(){
    int array[10];
    for (int x=0;x<10;x++){
        array[x]=x;
        printf("%d \n",x);
    }

    printf("array pos 5 -> %d", array[5]);


    return 0;
}