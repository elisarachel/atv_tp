import React, { useState } from "react";
import { TextField, Button, Grid, useMediaQuery, useTheme } from "@mui/material";

interface Servico {
    nome: string;
    descricao: string;
    preco: number;
}

interface Props {
    tema: string;
    onCadastroServico: (servico: Servico) => void;
}

const FormularioCadastroServico: React.FC<Props> = ({ tema, onCadastroServico }) => {
    const [formData, setFormData] = useState<Servico>({
        nome: "",
        descricao: "",
        preco: 0,
    });

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

	const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.replace(/\D/g, '');
        setFormData((prevData) => ({
            ...prevData,
            preco: parseInt(value) || 0, 
        }));
    };

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const { nome, descricao, preco } = formData;
        if (!nome || !descricao || preco <= 0) {
            alert("Todos os campos são obrigatórios e o preço deve ser maior que 0.");
            return;
        }

        onCadastroServico(formData);

        setFormData({
            nome: "",
            descricao: "",
            preco: 0,
        });
    };

	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <form onSubmit={handleFormSubmit}>
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="nome"
                                label="Nome do Serviço"
                                variant="outlined"
                                name="nome"
                                value={formData.nome}
                                onChange={handleInputChange}
								required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="descricao"
                                label="Descrição"
                                variant="outlined"
                                name="descricao"
                                value={formData.descricao}
                                onChange={handleInputChange}
                                multiline
                                rows={4}
								required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="preco"
                                label="Preço"
                                variant="outlined"
                                name="preco"
                                type="number"
                                value={formData.preco}
                                onChange={handlePriceChange}
								required
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                type="submit"
                                className={tema}
                                fullWidth={isMobile}
                            >
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </Grid>
    );
};

export default FormularioCadastroServico;
