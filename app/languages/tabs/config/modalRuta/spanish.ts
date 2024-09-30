import { TemplateModalRuta } from "@/app/types";

export const spanish:TemplateModalRuta = {
    validationMessages: {
        rutaAdded: "Ruta agregada",
        rutaEdited: "La ruta ha sido modificada",
        splitAdded: "Split agregado",
        splitEdited: "Se ha modificado el split",
        splitRemoved: "Split eliminado. Guarda los cambios para que estos sean aplicados",
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
    }
}