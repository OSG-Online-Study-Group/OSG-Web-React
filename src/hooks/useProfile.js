import { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
import { atualizarPerfil } from "../services/firestore";
import { useAuth } from "../hooks/useAuth";

export function useProfile(usuario) {
    const { refreshUsuario } = useAuth();

    const [foto, setFoto] = useState(null);
    const [theme, setTheme] = useState(null);
    const [nome, setNome] = useState("");

    // sincroniza com usuário
    useEffect(() => {
        if (usuario) {
            setFoto(usuario.photo || null);
            setTheme(usuario.theme || null);
            setNome(usuario.name || "");
        }
    }, [usuario]);

    // ───────── FOTO ─────────
    async function escolherFoto() {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            quality: 0.7,
        });

        if (!result.canceled) {
            uploadCloudinary(result.assets[0].uri);
        }
    }

    async function uploadCloudinary(uri) {
        try {
            const data = new FormData();

            data.append("file", {
                uri,
                type: "image/jpeg",
                name: "profile.jpg",
            });

            data.append("upload_preset", "foto_perfil");

            const res = await fetch(
                "https://api.cloudinary.com/v1_1/dtmiwy78p/image/upload",
                {
                    method: "POST",
                    body: data,
                }
            );

            const json = await res.json();

            if (!json.secure_url) throw new Error();

            setFoto(json.secure_url);

        } catch {
            Alert.alert("Erro ao enviar imagem");
        }
    }

    // ───────── SALVAR ─────────
    async function salvar(uid, navigation) {
        try {
            const dados = {};

            if (foto !== undefined) dados.photo = foto;
            if (theme !== undefined) dados.theme = theme || null;
            if (nome !== undefined) dados.name = nome;

            await atualizarPerfil(uid, dados);

            // 🔥 atualiza na hora (SEM relogar)
            refreshUsuario(dados);

            Alert.alert("Sucesso", "Perfil atualizado!");
            navigation.goBack();

        } catch {
            Alert.alert("Erro ao salvar");
        }
    }

    // ───────── REMOVER FOTO ─────────

    function removerFoto() {
        setFoto(null);
    }

    return {
        foto,
        theme,
        nome,
        setTheme,
        setNome,
        escolherFoto,
        salvar,
        removerFoto,
    };
}