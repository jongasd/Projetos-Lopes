import os
import shutil

pasta_organizar = input("Digite o caminho da pasta que deseja organizar: ")

def organizar_arquivos():
    global pasta_organizar
    pasta_imagens = os.path.join(pasta_organizar, "Imagens")
    pasta_arquivos = os.path.join(pasta_organizar, "Arquivos")
    pasta_documentos = os.path.join(pasta_organizar, "Documentos")
    os.mkdir(pasta_imagens)
    os.mkdir(pasta_arquivos)
    os.mkdir(pasta_documentos)

    if not os.path.exists(pasta_organizar):
        print(f"Pasta '{pasta_organizar}' não encontrada.")
        return
    if not os.path.isdir(pasta_organizar):
        print(f"Pasta '{pasta_organizar}' não é um diretório.")
        return

    for raiz, pastas, arquivos in os.walk(pasta_organizar):
        for pasta in pastas:
            caminho_pasta = os.path.join(raiz, pasta)
            if caminho_pasta != pasta_organizar:
                shutil.move(caminho_pasta, pasta_organizar)

    for raiz, pastas, arquivos in os.walk(pasta_organizar):
        for arquivo in arquivos:
            extensao = os.path.splitext(arquivo)[1]
            if extensao.lower() in [".jpg", ".jpeg", ".png", ".gif", ".bmp"]:
                shutil.move(pasta_imagens)
            elif extensao.lower() in [".py", ".js", ".html", ".css", ".c++" ]:
                shutil.move(pasta_arquivos)
            else:
                shutil.move(pasta_documentos)
try:
    organizar_arquivos()
    print(f"Os arquivos foram organizados com sucesso!")
except Exception as e:
    print(f"Ocorreu um erro ao organizar os arquivos: {e}")