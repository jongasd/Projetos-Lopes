import os
import shutil
pasta_organizar = input("Digite o caminho da pasta que deseja organizar: ")


def organizar_arquivos():
    global pasta_organizar
    pasta_imagens = os.path.join(pasta_organizar, "Imagens")
    pasta_arquivos = os.path.join(pasta_organizar, "Arquivos")
    pasta_documentos = os.path.join(pasta_organizar, "Documentos")
    pasta_outros = os.path.join(pasta_organizar, "Outros")

    if not os.path.exists(pasta_organizar):
        print("Essa pasta não foi encontrada, tente novamente.")
        return

    for raiz, pastas, arquivos in os.walk(pasta_organizar):
        for pasta in pastas:
            caminho_pasta = os.path.join(raiz, pasta)
            shutil.move(caminho_pasta, pasta_organizar)

    for raiz, pastas, arquivos in os.walk(pasta_organizar):
        for arquivo in arquivos:
            caminho_arquivo = os.path.join(raiz, arquivo)
            extensao = os.path.splitext(arquivo)[1]
            if extensao.lower() in [".jpg", ".jpeg", ".png", ".gif", ".bmp"]:
                shutil.move(caminho_arquivo, pasta_imagens)
            elif extensao.lower() in [".py", ".js", ".html", ".css", ".c++", ".exec", ".bat"]:
                shutil.move(caminho_arquivo, pasta_arquivos)
            elif extensao.lower() in [".pdf", ".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx", ".excel"]:
                shutil.move(caminho_arquivo, pasta_documentos)
            else:   
                shutil.move(caminho_arquivo, pasta_outros)

print(f"O seus arquivos foram organizados, confira na pasta {pasta_organizar}, para ver as mudanças!")