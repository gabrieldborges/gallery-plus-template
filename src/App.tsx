import InputCheckbox from "./components/input-checkbox";
import Button from "./components/button";
import ButtonIcon from "./components/button-icon";
import ChevronLeftIcon from "./assets/icons/chevron-left.svg?react";
import ChevronRightIcon from "./assets/icons/chevron-right.svg?react";
import Badge from "./components/badge";
import Alert from "./components/alert";
import Divider from "./components/divider";
import InputText from "./components/input-text";
import searchIcon from "./assets/icons/search.svg?react"
import InputSingleFile from "./components/input-single-file";
import { useForm } from "react-hook-form";
import ImageFilePreview from "./components/image-file-preview";
import { Dialog, DialogTrigger, DialogClose } from "../src/components/ui-components/dialog";
import DialogContent from "../src/components/ui-components/dialog";
import { DialogHeader, DialogBody, DialogFooter } from "../src/components/ui-components/dialog";


export default function App() {
	const form = useForm();
	const file = form.watch("file")
	const fileSrc = file?.[0] ? URL.createObjectURL(file[0]) : undefined



	return (
		<div className="grid gap-7 p-6">
			<div className="flex gap-3">
				<Button>Button</Button>
				<Button variant="secondary">Button</Button>
				<Button disabled>Button</Button>
				<Button handling>Loading</Button>
				<Button icon={ChevronRightIcon}>Próxima Imagem</Button>
				<Button variant="ghost" size="sm">
					Button
				</Button>
				<Button variant="primary" size="sm">
					Button
				</Button>
			</div>

			<div className="flex gap-3">
				<ButtonIcon icon={ChevronLeftIcon} />
				<ButtonIcon icon={ChevronRightIcon} variant="secondary" />
			</div>

			<div className="flex gap-3">
				<Badge>Todos</Badge>
				<Badge>Natureza</Badge>
				<Badge>Viagem</Badge>
				<Badge loading>Viagem</Badge>
				<Badge loading>Viagem</Badge>
				<Badge loading>Viagem</Badge>
			</div>

			<div>
				<Alert>
					Tamanho máximo: 50MB
					<br />
					Você pode selecionar arquivos em PNG, JPG, JPEG, WEBP ou SVG
				</Alert>
			</div>

			<div>
				<Divider />
			</div>
			<InputText icon={searchIcon}></InputText>
			<InputCheckbox size="md"></InputCheckbox>
			<InputCheckbox size="sm"></InputCheckbox>
			<hr />


			<Dialog>
				<DialogTrigger asChild>
					<Button>Abrir Modal</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>Teste</DialogHeader>
					<DialogBody>
						<Alert>
							Tamanho máximo: 50MB
							<br />
							Você pode selecionar arquivos em PNG, JPG, JPEG, WEBP ou SVG
						</Alert>
						<InputSingleFile
							form={form}
							allowedExtensions={["png", "jpeg", "jpg", "webp", " svg"]}
							maxFileSizeInMB={50}
							replaceBy={<ImageFilePreview src={fileSrc} />}
							{...form.register("file")}
						></InputSingleFile>
					</DialogBody>
					<DialogFooter>
						<DialogClose asChild>
							<Button variant="secondary">Cancelar</Button>
						</DialogClose>
						<Button variant="primary">Enviar</Button>

					</DialogFooter>
				</DialogContent>
			</Dialog>

		</div>
	);
}
