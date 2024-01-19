{
  description = "Standup-board build environment";
  inputs = { 
		nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
	};

  outputs = { self, nixpkgs }:
    let
      pkgs = nixpkgs.legacyPackages.x86_64-linux.pkgs;
    in {
      devShells.x86_64-linux.default = pkgs.mkShell {
        name = "Standup-board build environment";
        buildInputs = with pkgs; [
          nodejs_18
					prettierd
        ];
        shellHook = ''
          echo "Welcome in $name"
        '';
      };
    };
}
