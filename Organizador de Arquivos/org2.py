import os
import shutil

pasta_organizar = input("Digite o caminho da pasta que deseja organizar: ")

def organizar_arquivos(pasta_organizar):
    # Verifica se a pasta existe
    if not os.path.exists(pasta_organizar):
        print("Essa pasta não foi encontrada, tente novamente.")
        return

    # Cria as subpastas, se ainda não existirem
    pasta_imagens = os.path.join(pasta_organizar, "Imagens")
    pasta_arquivos = os.path.join(pasta_organizar, "Arquivos")
    pasta_documentos = os.path.join(pasta_organizar, "Documentos")

    os.makedirs(pasta_imagens, exist_ok=True)
    os.makedirs(pasta_arquivos, exist_ok=True)
    os.makedirs(pasta_documentos, exist_ok=True)

    # Itera sobre os arquivos da pasta
    for item in os.listdir(pasta_organizar):
        caminho_item = os.path.join(pasta_organizar, item)

        # Ignora as pastas que o próprio script criou
        if item in ["Imagens", "Arquivos", "Documentos"]:
            continue

        if os.path.isfile(caminho_item):
            extensao = os.path.splitext(item)[1].lower()
            if extensao in [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".mp4"]:
                shutil.move(caminho_item, pasta_imagens)
            elif extensao in [".py", ".js", ".html", ".css", ".cpp"]:
                shutil.move(caminho_item, pasta_arquivos)
            else:
                shutil.move(caminho_item, pasta_documentos)

    print(f"Os seus arquivos foram organizados! Confira na pasta: {pasta_organizar}")

# Chamada dentro do try
try:
    organizar_arquivos(pasta_organizar)
except Exception as e:
    print(f"Ocorreu um erro: {e}")
