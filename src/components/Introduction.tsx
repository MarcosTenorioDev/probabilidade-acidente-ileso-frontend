import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import performanceIcon from "@/assets/performance.png";
import databaseIcon from "@/assets/database.png";
import dataIcon from "@/assets/data.png";
import algorithmIcon from "@/assets/algorithm.png";
import carGif from "@/assets/car-free.gif";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Button } from "./ui/button";

interface FeatureProps {
  title: string;
  description: string;
  image: string;
}

const features: FeatureProps[] = [
  {
    title: "Conjunto de Dados",
    description:
      "Analisamos dados históricos de acidentes nas rodovias federais brasileiras, fornecidos pela PRF, abrangendo o período de 2017 a 2023, com informações detalhadas sobre os acidentes.",
    image: databaseIcon,
  },
  {
    title: "Pré-processamento dos Dados",
    description:
      "Realizamos limpeza, tratamento de valores ausentes, remoção de outliers e codificação das variáveis para preparar os dados para modelagem.",
    image: dataIcon,
  },
  {
    title: "Seleção de Algoritmos",
    description:
      "Escolhemos algoritmos como Regressão Logística, SVM Linear, Árvore de Decisão e Random Forest para prever as probabilidades de uma pessoa sair ilesa em acidentes.",
    image: algorithmIcon,
  },
  {
    title: "Métricas de Avaliação",
    description:
      "Utilizamos métricas como acurácia, precisão, revocação e área ROC para avaliar o desempenho dos modelos de aprendizado de máquina.",
    image: performanceIcon,
  },
];

export const Introduction = () => {
  useEffect(() => {
    AOS.init({ duration: 1200 });
  });

  return (
    <section
      className="container py-24 sm:py-32 mx-auto px-4 sm:px-4"
      data-aos="zoom-in"
    >
      <div className="grid lg:grid-cols-[1fr,1fr] gap-8 place-items-center">
        <div className="flex flex-col justify-between">
          <h2 className="text-3xl lg:text-4xl font-bold text-center sm:text-start">
            <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
              Análise de Acidentes nas Rodovias Federais
            </span>
          </h2>

          <p className="text-muted-foreground text-xl mt-4 mb-8 text-center sm:text-start">
            Explore nossa análise preditiva de acidentes nas rodovias federais
            brasileiras, baseada em dados reais e modelos de aprendizado de
            máquina.
          </p>
          <div className="flex flex-col gap-8 mt-10 lg:mt-4">
            {features.map(({ image, title, description }: FeatureProps) => (
              <Card key={title}>
                <CardHeader className="space-y-1 flex md:flex-row justify-start  items-center text-center sm:text-start sm:items-start gap-4">
                  <img
                    src={image}
                    alt="Card icon"
                    className="w-12 h-12 bg-primary p-1 rounded-sm"
                  />

                  <div>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription className="text-md mt-2">
                      {description}
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-between lg:pb-2">
          <img
            src={carGif}
            className="w-[300px] md:w-[500px] lg:w-[600px] object-contain"
            alt="Sobre a análise"
          />

          <a
            href="https://colab.research.google.com/drive/1FSznDEK3Xhwd4H0tX6vv5geidjeRVXlF#scrollTo=ICdNTBJJ3OSc"
            target="_blank"
            className="w-full"
          >
            {" "}
            <Button
              variant={"outline"}
              className="hover:bg-primary hover:text-black w-full"
              size={"lg"}
            >
              Ver o código do modelo
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};
