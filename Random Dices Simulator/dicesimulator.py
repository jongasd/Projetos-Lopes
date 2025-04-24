import random

def diceroll():
    print("Escolha qual tipo de dado deseja jogar:")
    print("D3 - D4- D6- D10- D12- D20- D100- D1000 - Sair")
    choosed = input("")
    print("Digite a quantidade de vezes que deseja rodar o dado:")
    number = int(input(""))
    if choosed == "D3" or choosed == "d3":
        for res in range(number):
            d3 = random.randint(1, 3)
            print("O número que caiu foi: ", d3)
    elif choosed == "D4" or choosed == "d4":
        for res in range(number):
            d4 = random.randint(1, 4)
            print("O número que caiu foi: ", d4)
    elif choosed == "D6" or choosed == "d6":
        for res in range(number):
            d6 = random.randint(1, 6)
            print("O número que caiu foi: ", d6)
    elif choosed == "D10" or choosed == "d10":
        for res in range(number):
            d10 = random.randint(1, 10)
            print("O número que caiu foi: ", d10)
    elif choosed == "D12" or choosed == "d12":
        for res in range(number):
            d12 = random.randint(1, 12)
            print("O número que caiu foi: ", d12)
    elif choosed == "D20" or choosed == "d20":
        for res in range(number):
            d20 = random.randint(1, 20)
            print("O número que caiu foi: ", d20)
    elif choosed == "D100" or choosed == "d100":
        for res in range(number):
            d100 = random.randint(1, 100)
            print("O número que caiu foi: ", d100)
    elif choosed == "D1000" or choosed == "d1000":
        for res in range(number):
            d1000 = random.randint(1, 1000)
            print("O número que caiu foi: ", d1000)
    elif choosed == "Sair":
        exit
    else:
        print("Houve um Erro no Sistema, tente novamente:")
diceroll()