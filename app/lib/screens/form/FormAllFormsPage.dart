import 'package:app/screens/form/SelectedFormsPage.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../../models/PromoterFormsModel.dart';
import '../../service/promoterService.dart';
import '../../utils/FormButtons/FormTabs.dart';

class Formallformspage extends StatefulWidget {
  final String promoterId;

  const Formallformspage({required this.promoterId});

  @override
  State<Formallformspage> createState() => _FormallformspageState();
}

class _FormallformspageState extends State<Formallformspage> {
  late Future<List<PromoterForm>> _promoterDetails;

  @override
  void initState() {
    super.initState();
    _promoterDetails = PromoterService.fetchPromoterForms(widget.promoterId);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      appBar: AppBar(
        leading: GestureDetector(
          onTap: () {
            Navigator.pop(context);
          },
          child: const Icon(
            Icons.arrow_back_ios_new,
            color: Colors.grey,
            size: 18,
          ),
        ),
        title: Text(
          "Check your Forms",
          style: GoogleFonts.poppins(
              fontSize: 16, color: Colors.white, fontWeight: FontWeight.w600),
          overflow: TextOverflow.ellipsis,
        ),
        automaticallyImplyLeading: false,
        backgroundColor: Colors.black,
      ),
      body: LayoutBuilder(
        builder: (context, constraints) {
          double width = constraints.maxWidth;
          double padding = width > 600 ? 20 : 10;

          return Container(
            margin: EdgeInsets.fromLTRB(padding, 0, padding, 0),
            child: Column(
              children: [
                FutureBuilder<List<PromoterForm>>(
                  future: _promoterDetails,
                  builder: (context, snapshot) {
                    if (snapshot.connectionState == ConnectionState.waiting) {
                      return const Center(child: CircularProgressIndicator());
                    } else if (snapshot.hasError) {
                      return Center(child: Text('Error: ${snapshot.error}'));
                    } else if (snapshot.hasData) {
                      if (snapshot.data!.isEmpty) {
                        return const Center(child: Text('No forms found'));
                      }
                      return Expanded(
                        child: ListView.builder(
                          itemCount: snapshot.data!.length,
                          itemBuilder: (context, index) {
                            final form = snapshot.data![index];
                            return GestureDetector(
                              onTap: () {
                                Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                    builder: (context) => SelectedFormsPage(
                                      promoterId: widget.promoterId,
                                      formTitle: form.collectionName,
                                      formId: form.formId,
                                    ),
                                  ),
                                );
                              },
                              child: Padding(
                                padding:
                                    const EdgeInsets.symmetric(vertical: 8.0),
                                child: FormTabs(
                                  id: form.formId,
                                  title: form.collectionName,
                                ),
                              ),
                            );
                          },
                        ),
                      );
                    } else {
                      return const Center(child: Text('No data found'));
                    }
                  },
                ),
              ],
            ),
          );
        },
      ),
    );
  }
}
