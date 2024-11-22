"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AlertTriangle, Car } from "lucide-react";
import { Introduction } from "./components/Introduction";

const formSchema = z.object({
  Pessoas: z.number().int().positive("O número de pessoas deve ser positivo."),
  Veículos: z
    .number()
    .int()
    .positive("O número de veículos deve ser positivo."),
  Sentido: z.string().nonempty("O sentido é obrigatório."),
  Clima: z.string().nonempty("O clima é obrigatório."),
  Pista: z.string().nonempty("O tipo de pista é obrigatório."),
  Traçado: z.string().nonempty("O traçado da via é obrigatório."),
  UF: z.string().length(2, "A UF deve ter exatamente 2 caracteres."),
  BR: z
    .number()
    .int()
    .positive("O número da BR deve ser positivo.")
    .int("O número da BR deve ser inteiro."),
  Mês: z.string().min(1, "O mês é obrigatório."),
  Dia: z
    .number()
    .int()
    .min(1, "O dia deve ser no mínimo 1.")
    .max(31, "O dia deve ser no máximo 31."),
});

function App() {
  const [prediction, setPrediction] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Pessoas: 1,
      Veículos: 1,
      Sentido: "",
      Clima: "",
      Pista: "",
      Traçado: "",
      UF: "",
      BR: 0,
      Mês: "",
      Dia: 1,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://backend-aprendizado-de-maquinas-production.up.railway.app/prever",
        values
      );
      setPrediction(response.data.probabilidade_ileso);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <main className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 top-0 flex flex-col justify-center items-center opacity-10">
          <div className="w-full h-16 bg-primary my-8"></div>
          <div className="w-full h-16 bg-primary my-8"></div>
          <div className="w-full h-16 bg-primary my-8"></div>
        </div>

        <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-red-500 shadow-lg"></div>

        <div className="absolute top-4 left-4 w-0 h-0 border-l-[32px] border-l-transparent border-r-[32px] border-r-transparent border-b-[56px] border-b-yellow-400 shadow-lg"></div>

        <div className="relative z-10 w-full max-w-7xl sm:px-10 lg:px-20">
          <h1 className="text-4xl font-bold text-primary mb-8 mt-20 sm:mt-0 text-center">
            Sistema de Previsão de Probabilidade de Sair Ileso em um Acidente de
            Trânsito
          </h1>
          <Card className="w-full mx-auto max-h-[80%] bg-white shadow-lg border-t-8 border-primary">
            <CardHeader className="bg-gray-100 py-4">
              <CardTitle className="text-2xl flex flex-col lg:flex-row font-bold text-center text-gray-800 items-center justify-center">
                <Car className="mr-2 text-primary  w-10 h-10" />
                Previsão da Probabilidade de Sair Ileso em um Acidente de
                Trânsito
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full"
                >
                  <FormField
                    control={form.control}
                    name="Pessoas"
                    render={({ field }) => (
                      <FormItem className="text-black">
                        <FormLabel>Número de Pessoas</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value))
                            }
                            className="border-black"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="Veículos"
                    render={({ field }) => (
                      <FormItem className="text-black">
                        <FormLabel>Número de Veículos</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value))
                            }
                            className="border-black"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="Sentido"
                    render={({ field }) => (
                      <FormItem className="text-black">
                        <FormLabel>Sentido</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="border-black">
                              <SelectValue placeholder="Selecione o sentido" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Crescente">Crescente</SelectItem>
                            <SelectItem value="Decrescente">
                              Decrescente
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="Clima"
                    render={({ field }) => (
                      <FormItem className="text-black">
                        <FormLabel>Clima</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="border-black">
                              <SelectValue placeholder="Selecione o clima" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Vento">Vento</SelectItem>
                            <SelectItem value="Garoa/Chuvisco">
                              Garoa/Chuvisco
                            </SelectItem>
                            <SelectItem value="Nublado">Nublado</SelectItem>
                            <SelectItem value="Céu Claro">Céu Claro</SelectItem>
                            <SelectItem value="Sol">Sol</SelectItem>
                            <SelectItem value="Chuva">Chuva</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="Pista"
                    render={({ field }) => (
                      <FormItem className="text-black">
                        <FormLabel>Tipo de Pista</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="border-black">
                              <SelectValue placeholder="Selecione o tipo de pista" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Simples">Simples</SelectItem>
                            <SelectItem value="Dupla">Dupla</SelectItem>
                            <SelectItem value="Múltipla">Múltipla</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="Traçado"
                    render={({ field }) => (
                      <FormItem className="text-black">
                        <FormLabel>Traçado da Via</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="border-black">
                              <SelectValue placeholder="Selecione o traçado" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Reta">Reta</SelectItem>
                            <SelectItem value="Reta;Aclive">
                              Reta com Aclive
                            </SelectItem>
                            <SelectItem value="Reta;Declive">
                              Reta com Declive
                            </SelectItem>
                            <SelectItem value="Curva">Curva</SelectItem>
                            <SelectItem value="Curva;Declive">
                              Curva com Declive
                            </SelectItem>
                            <SelectItem value="Curva;Aclive">
                              Curva com Aclive
                            </SelectItem>
                            <SelectItem value="Interseção de Vias">
                              Interseção de Vias
                            </SelectItem>
                            <SelectItem value="Retorno Regulamentado">
                              Retorno Regulamentado
                            </SelectItem>
                            <SelectItem value="Viaduto">Viaduto</SelectItem>
                            <SelectItem value="Rotatória">Rotatória</SelectItem>
                            <SelectItem value="Em Obras">Em Obras</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="UF"
                    render={({ field }) => (
                      <FormItem className="text-black">
                        <FormLabel>UF</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="border-black">
                              <SelectValue placeholder="Selecione a UF" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {[
                              "AC",
                              "AL",
                              "AM",
                              "AP",
                              "BA",
                              "CE",
                              "DF",
                              "ES",
                              "GO",
                              "MA",
                              "MG",
                              "MS",
                              "MT",
                              "PA",
                              "PB",
                              "PE",
                              "PI",
                              "PR",
                              "RJ",
                              "RN",
                              "RO",
                              "RR",
                              "RS",
                              "SC",
                              "SE",
                              "SP",
                              "TO",
                            ].map((uf) => (
                              <SelectItem key={uf} value={uf}>
                                {uf}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="BR"
                    render={({ field }) => (
                      <FormItem className="text-black">
                        <FormLabel>Número da BR</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value))
                            }
                            className="border-black"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="Mês"
                    render={({ field }) => (
                      <FormItem className="text-black">
                        <FormLabel>Mês</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="border-black">
                              <SelectValue placeholder="Selecione o mês" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {[
                              "Janeiro",
                              "Fevereiro",
                              "Março",
                              "Abril",
                              "Maio",
                              "Junho",
                              "Julho",
                              "Agosto",
                              "Setembro",
                              "Outubro",
                              "Novembro",
                              "Dezembro",
                            ].map((month) => (
                              <SelectItem key={month} value={month}>
                                {month}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="Dia"
                    render={({ field }) => (
                      <FormItem className="text-black">
                        <FormLabel>Dia</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value))
                            }
                            min={1}
                            max={31}
                            className="border-black"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="col-span-1 sm:col-span-2 w-full bg-primary hover:bg-primary/60 text-white mt-5"
                    disabled={isLoading}
                  >
                    {isLoading
                      ? "Carregando..."
                      : "Prever probabilidade de sair ileso"}
                  </Button>
                </form>
              </Form>
              {Object.keys(form.formState.errors).length > 0 && (
                <p className="text-red-500 text-sm mt-2">
                  Por favor, corrija os erros no formulário antes de enviar*
                </p>
              )}
              {prediction !== null && (
                <div className="mt-4 p-4 bg-red-100 rounded-md flex items-center space-x-2 border border-red-300">
                  <AlertTriangle className="text-red-500" />
                  <p className="text-red-700">
                    Probabilidade de sair ileso do acidente:{" "}
                    <strong>{(prediction * 100).toFixed(2)}%</strong>
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Introduction />
    </>
  );
}

export default App;
