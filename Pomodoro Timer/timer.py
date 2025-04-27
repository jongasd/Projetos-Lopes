import time
print("Olá, aqui temos um timer para realizar a técnica Pomodoro!")
tempo = float(input("Primeiro digite aqui a quantidade em minutos de tempo que você deseja focar: "))

def timer(tempo):
    segundos = tempo * 60  # Convertendo minutos para segundos
    while segundos:
        mins, secs = divmod(segundos, 60)  # Quebra os segundos em minutos e segundos
        tempo_formatado = f'{mins:02d}:{secs:02d}'  # Formata o tempo para 00:00
        print(tempo_formatado, end='\r')  # Exibe no terminal (sem pular linha)
        time.sleep(1)  # Espera 1 segundo
        segundos -= 1  # Diminui 1 segundo

    print("\n⏰ Tempo acabou! Faça uma pausa. 🎉")

# ---- Programa Principal ----
minutos_input = int(input("Quantos minutos você quer focar? "))
timer(minutos_input)
