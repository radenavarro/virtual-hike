import { TemplateModalRuta } from "@/app/types";

export const spanish:TemplateModalRuta = {
    header: "Gestión de rutas",
    currentPathText: 'Ruta actual',
    loadPathText: 'Cargar ruta',
    pathNameText: 'Nombre de la ruta',
    daysToCompleteText: 'Días para completar la ruta',
    split: {
        splitsText: 'Puntos intermedios',
        nameText: 'Nombre',
        namePhText: 'Nombre',
        startsInKmText: 'Comienza en el km',
        startsInKmPhText: 'Km',
        durationKmsText: 'Duración en kms',
        durationKmsPhText: 'Duración en kms',
        addSplit: 'Anadir este punto',
        editSplit: 'Editar punto',
        removeSplit: 'Eliminar punto',
        graphics: {
            nameText: 'Gráficos',
            skyboxText: 'Cielo',
            backgroundText: 'Detrás',
            middleText: 'Medio',
            foregroundText: 'Delante',
            alias: {
                grass: "Pasto",
                town: "Pueblo",
                wasteland: "Yermo",
                cave: "Cueva",
                lake: "Lago",
                forest: "Bosque",
                marsh: "Pantano",
            }
        }
    },
    validationMessages: {
        rutaAdded: "Ruta agregada",
        rutaEdited: "Las modificaciones en la ruta han sido guardadas",
        splitAdded: "Split agregado",
        splitEdited: "Se ha modificado el split",
        splitRemoved: "Split eliminado. Guarda los cambios para que estos sean aplicados",
        spriteChanged: "Sprite cambiado. Guarda los cambios para que estos sean aplicados"
    },
    validationErrorMessages: {
        splitErrorTitle: "Error en los splits",
        noName: "No hay nombre",
        noKm: "No hay km",
        noDuration: "No hay duración",
        kmBelowZero: "El km debe ser mayor que 0",
        durationZeroOrLess: "La duración debe ser mayor que 0",
        nameEmpty: "El nombre no puede estar vacío",
        nameInSplits: "El nombre no puede estar en los splits",
        kmInSplits: "El km no puede estar en los splits",
        overlappingSplits: "Hay superposición en los splits: ",
    },
}