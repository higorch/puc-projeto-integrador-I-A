import db


def proccessDiagnosis(userSymptoms):

    results = []

    for illness in db.illnesses:

        title = illness['title']
        symptoms = illness['symptoms']

        # verificar sintomas da doenca com os do usuario, e retornar somente sintomas que coincidem
        matches = list(set(symptoms) & set(userSymptoms))

        userSymptomsCount = len(matches)
        illnessSymptomsCount = len(symptoms)

        if userSymptomsCount > 0:

            probability = (userSymptomsCount / illnessSymptomsCount) * 100

            results.append({
                "title": title,
                "probability": round(probability, 2),
                "symptoms": matches,
            })

    return results
