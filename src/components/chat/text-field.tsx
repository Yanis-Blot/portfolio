import { Button } from "@/components/ui/button"

type Props = {
    value: string;
    onChange: (v: string) => void;
    onSubmit: () => void;
}

export function TextField({ value, onChange, onSubmit }: Props){
    return(
        <div className="w-full min-w-l">
            <div
                className="flex flex-row border border-white rounded-xl p-2 items-center"
            >
                <Button 
                    type="submit"
                    variant="default"
                    onClick={onSubmit}
                >
                    Envoyer
                </Button>
                <input 
                    className="flex ml-5 text-white outline-none placeholder:text-gray-400 w-full"
                    value={value}
                    onChange={ (e) => onChange(e.target.value)}
                    placeholder="Entrez du texte..."
                >
                </input>
            </div>
        </div>
    )
}